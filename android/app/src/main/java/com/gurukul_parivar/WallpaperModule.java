package com.gurukul_parivar;

import android.app.WallpaperManager;
import android.graphics.Bitmap;

import android.graphics.BitmapFactory;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

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
    public Promise setAsWallpaper ( String fileURL ,final Promise promise ) {
        try {
            URL url = new URL ( fileURL );
            HttpURLConnection connection = ( HttpURLConnection ) url.openConnection ( );
            connection.setDoInput ( true );
            connection.connect ( );
            InputStream input = connection.getInputStream ( );
            Bitmap bitmap = BitmapFactory.decodeStream ( input );

            try {
                if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
                    setOnLockScreenWallPaper ( bitmap );
                }
                else
                {
                    setOnHomeScreenWallPaper ( bitmap );
                }
            } catch ( Exception e ) {
                promise.reject ( "ERROR" , "Error setting wallpaper" , e );
            }

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
                wallpaperManager.setBitmap ( bitmap );
            }
        } catch ( Exception e ) {
            throw e;
        }
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
