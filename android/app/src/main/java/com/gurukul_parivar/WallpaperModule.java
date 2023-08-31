package com.gurukul_parivar;

import android.app.WallpaperManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.net.HttpURLConnection;
import java.net.URL;

import java.io.IOException;
import java.io.InputStream;


public class WallpaperModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    WallpaperModule(ReactApplicationContext context) {
        super(context);

        context.addLifecycleEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
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
    public void onHostResume() {
        Log.d("Host Resume", "Resume");
    }

    @Override
    public void onHostPause() {
        Log.d("Host Pause", "Pause");
    }

    @Override
    public void onHostDestroy() {
        Log.d("Host destroy", "Destroy");
    }
}
