package com.gurukul_parivar;

import static android.provider.MediaStore.Images.Media.getBitmap;

import android.app.WallpaperManager;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;

import android.graphics.BitmapFactory;
import android.graphics.Point;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.load.DecodeFormat;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.load.engine.bitmap_recycle.BitmapPool;
import com.bumptech.glide.load.resource.bitmap.BitmapTransformation;
import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.transition.Transition;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.jetbrains.annotations.NotNull;

import java.io.ByteArrayOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import java.io.IOException;
import java.io.InputStream;


public class WallpaperModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    WallpaperModule ( ReactApplicationContext context ) {
        super ( context );
        context.addLifecycleEventListener ( this );
    }

    @NonNull
    @Override
    public String getName ( ) {
        return "WallpaperModule";
    }

    @ReactMethod
    public Promise setAsWallpaper ( String fileURL , String mode , final Promise promise ) {
        try {
            String imageUrl = fileURL; // or R.drawable.image_resource
            Glide.with(getReactApplicationContext())
                    .asBitmap()
                    .load(imageUrl)
                    .into(new SimpleTarget<Bitmap>() {
                        @Override
                        public void onResourceReady(Bitmap resource, Transition<? super Bitmap> transition) {
                            WallpaperManager wallpaperManager = WallpaperManager.getInstance(getReactApplicationContext());
                            try {
                                if ( mode.equals ( "HOME" ) ) {
                                    try {
                                        setOnHomeScreenWallPaper ( resource );
                                    } catch ( Exception e ) {
                                        promise.reject ( "ERROR" , "Error setting Home wallpaper" , e );
                                    }
                                }
                                if ( mode.equals ( "LOCK" ) ) {
                                    if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
                                        try {
                                            setOnLockScreenWallPaper ( resource );
                                        } catch ( Exception e ) {
                                            promise.reject ( "ERROR" , "Error setting LOCK wallpaper" , e );
                                        }
                                    }
                                }
                                if ( mode.equals ( "BOTH" ) ) {
                                    try {
                                        setOnHomeScreenWallPaper ( resource );
                                        if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
                                            setOnLockScreenWallPaper ( resource );
                                        }
                                    } catch ( Exception e ) {
                                        promise.reject ( "ERROR" , "Error setting BOTH wallpaper" , e );
                                    }
                                }

                            } catch ( Exception e ) {
                                promise.reject ( "ERROR" , "Error setting wallpaper" , e );
                            }
                        }
                    });
            promise.resolve ( "SUCCESS" );
        } catch ( Exception e ) {
            promise.reject ( "ERROR" , "Error setting wallpaper" , e );
        }
        return promise;
    }

    public void setOnHomeScreenWallPaper ( Bitmap bitmap ) throws Exception {
        try {
            WallpaperManager wallpaperManager = WallpaperManager.getInstance ( getReactApplicationContext ( ) );
            wallpaperManager.setBitmap ( bitmap );
        } catch ( Exception e ) {
            throw e;
        }
    }

    public void setOnLockScreenWallPaper ( Bitmap bitmap ) throws Exception {
        try {
            WallpaperManager wallpaperManager = WallpaperManager.getInstance ( getReactApplicationContext ( ) );
            if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
                wallpaperManager.setBitmap ( bitmap, null , true, WallpaperManager.FLAG_LOCK );
            }
            else
            {
                throw new Exception ( "Could not set wallpaper on this device..!" );
            }
        } catch ( Exception e ) {
            throw e;
        }
    }

    @Override
    public void onHostPause ( ) {
        Log.d ( "Host Pause" , "Pause" );
    }

    @Override
    public void onHostDestroy ( ) {
        Log.d ( "Host destroy" , "Destroy" );
    }
}



class CutOffLogo extends BitmapTransformation {

    @Override
    protected Bitmap transform (
            @NotNull BitmapPool pool ,
            @NotNull Bitmap toTransform ,
            int outWidth ,
            int outHeight
    ) {

        return Bitmap.createBitmap (
                toTransform ,
                0 ,
                0 ,
                toTransform.getWidth ( ) ,
                toTransform.getHeight ( ) - 20   // number of pixels
        );
    }

    @Override
    public void updateDiskCacheKey ( @NonNull MessageDigest messageDigest ) {

    }
}
