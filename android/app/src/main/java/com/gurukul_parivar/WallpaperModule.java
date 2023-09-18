package com.gurukul_parivar;

import static android.provider.MediaStore.Images.Media.getBitmap;

import android.annotation.SuppressLint;
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

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DecodeFormat;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.load.engine.bitmap_recycle.BitmapPool;
import com.bumptech.glide.load.resource.bitmap.BitmapTransformation;
import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.jetbrains.annotations.NotNull;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;

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

    @SuppressLint("CheckResult")
    @ReactMethod
    public Promise setAsWallpaper ( String remoteURL , String mode , final Promise promise ) {
        try {
            RequestOptions requestOptions = new RequestOptions ();
            requestOptions.override(1080, 1920) // Set your desired width and height here
                    .format( DecodeFormat.PREFER_RGB_565) // Adjust format for better memory usage
                    .fitCenter () // Scale image while keeping aspect ratio
//                    .transform ( new CutOffLogo () )
                    .diskCacheStrategy( DiskCacheStrategy.RESOURCE);
            Glide.with ( getReactApplicationContext () ).asBitmap ().load ( remoteURL ).apply (requestOptions).into ( new SimpleTarget<Bitmap> ( ) {
                @Override
                public void onResourceReady ( @NonNull Bitmap resource , @Nullable Transition<? super Bitmap> transition ) {
                    try {
                        ByteArrayOutputStream outputStream = new ByteArrayOutputStream (  );
                        resource.compress ( Bitmap.CompressFormat.JPEG, 80, outputStream );

                        byte[] compressedData = outputStream.toByteArray();
                        Bitmap compressedBitmap = BitmapFactory.decodeByteArray(compressedData, 0, compressedData.length);

                        if ( mode.equals ( "HOME" ) ) {
                            try {
                                setOnHomeScreenWallPaper ( compressedBitmap );
                            } catch ( Exception e ) {
                                promise.reject ( "ERROR" , "Error setting Home wallpaper" , e );
                            }
                        }
                        if ( mode.equals ( "LOCK" ) ) {
                            if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
                                try {
                                    setOnLockScreenWallPaper ( compressedBitmap );
                                } catch ( Exception e ) {
                                    promise.reject ( "ERROR" , "Error setting LOCK wallpaper" , e );
                                }
                            }
                        }
                        if ( mode.equals ( "BOTH" ) ) {
                            try {
                                setOnHomeScreenWallPaper ( compressedBitmap );
                                setOnLockScreenWallPaper ( compressedBitmap );
                            } catch ( Exception e ) {
                                promise.reject ( "ERROR" , "Error setting BOTH wallpaper" , e );
                            }
                        }
                    } catch ( Exception e ) {
                        promise.reject ( "ERROR" , "Error setting wallpaper" , e );
                    }
                    promise.resolve ( "SUCCESS" );
                }
            } );
        } catch ( Exception e ) {
            promise.reject ( "ERROR" , "Error setting wallpaper" , e );
        }
        return promise;
    }

    public void setOnHomeScreenWallPaper ( Bitmap bitmap ) throws Exception {
        try {
            WallpaperManager wallpaperManager = WallpaperManager.getInstance ( getReactApplicationContext ( ) );
            if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
                var wallpaper = getCroppedBitmap ( bitmap, wallpaperManager );
                wallpaperManager.setBitmap ( wallpaper, null,true, WallpaperManager.FLAG_SYSTEM );
            }
            else
            {
                wallpaperManager.setBitmap ( bitmap );
            }
        } catch ( Exception e ) {
            throw e;
        }
    }

    public void setOnLockScreenWallPaper ( Bitmap bitmap ) throws Exception {
        try {
            WallpaperManager wallpaperManager = WallpaperManager.getInstance ( getReactApplicationContext ( ) );
            if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
                var wallpaper = getCroppedBitmap ( bitmap, wallpaperManager );
                wallpaperManager.setBitmap ( wallpaper, null , true, WallpaperManager.FLAG_LOCK );
            }
            else
            {
                wallpaperManager.setBitmap ( bitmap );
            }
        } catch ( Exception e ) {
            throw e;
        }
    }

    public Bitmap getCroppedBitmap(Bitmap bitmap, WallpaperManager wallpaperManager){
        DisplayMetrics metrics = new DisplayMetrics();
        Display display = getCurrentActivity ().getWindowManager ().getDefaultDisplay ();
        display.getMetrics(metrics);
        final int screenWidth  = metrics.widthPixels;
        final int screenHeight = metrics.heightPixels;

        wallpaperManager.suggestDesiredDimensions(screenWidth, screenHeight);

        final float width = wallpaperManager.getDesiredMinimumWidth()+100;
        final float height = wallpaperManager.getDesiredMinimumHeight();

        return Bitmap.createScaledBitmap(bitmap, (int)width, (int)height, true);
    }

    @Override
    public void onHostResume ( ) {
        Log.d ( "Host Resume" , "Resume" );
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