package com.gurukul_parivar;

import android.app.WallpaperManager;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import android.net.Uri;
import android.os.Build;
import android.os.StrictMode;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
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
    public void setAsWallpaper(String fileURL, String mode, final Promise promise) {
        try {
            URL url = new URL(fileURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap bitmap = BitmapFactory.decodeStream(input);

            WallpaperManager wallpaperManager = WallpaperManager.getInstance(getReactApplicationContext());
            if (mode.equals("HOME")) {
                try {
                    Log.d("Lock", "came in home1");
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
                        wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_SYSTEM);// For Home screen
                        Log.d("Lock", "came in home2");

                    }
                } catch (Exception e) {
                    promise.reject("ERROR", "Error setting Home wallpaper", e);
                }
            }
            if (mode.equals("LOCK")) {
                try {
                    Log.d("Lock", "came in lock");
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
                        wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_LOCK);// For Lock screen
                        Log.d("Lock", "came in lock2");
                    }
                } catch (Exception e) {
                    promise.reject("ERROR", "Error setting LOCK wallpaper", e);
                }
            }
            if (mode.equals("BOTH")) {
                try {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                        wallpaperManager.setStream(input, null, true,
                                WallpaperManager.FLAG_LOCK | WallpaperManager.FLAG_SYSTEM);// For Home and Lock screen
                    }
                } catch (Exception e) {
                    promise.reject("ERROR", "Error setting BOTH wallpaper", e);
                }
            }

            promise.resolve("SUCCESS");
        } catch (Exception e) {
            promise.reject("ERROR", "Error setting wallpaper", e);
        }
    }

    // @ReactMethod
    // public boolean setAsWallpaper ( String fileURL , String mode ) {
    // try {
    // if ( mode.equals ( "LOCK" ) ) {
    // setLockScreen ( fileURL );
    // } else if ( mode.equals ( "HOME" ) ) {
    // Toast.makeText ( this.getReactApplicationContext ( ) , mode ,
    // Toast.LENGTH_LONG ).show ( );
    //
    // setHomeScreen ( fileURL );
    // } else {
    //// setWallpaperImage(fileURL);
    // }
    // } catch ( Exception e ) {
    // Log.e ( "test" , "setAsWallpaper: " + e.getMessage ( ) );
    // }
    // return true;
    //
    // }

    // private void setLockScreen ( String url ) {
    // int SDK_INT = android.os.Build.VERSION.SDK_INT;
    // if ( SDK_INT > 8 ) {
    // StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder ( )
    // .permitAll ( ).build ( );
    // StrictMode.setThreadPolicy ( policy );
    // }
    // try {
    // if ( android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N ) {
    // try {
    // WallpaperManager.getInstance ( getReactApplicationContext ( ) ).setStream (
    // drawableStream ( url ) , null , true , WallpaperManager.FLAG_LOCK );
    // } catch ( IOException e ) {
    // e.printStackTrace ( );
    // }
    // }
    // } catch ( Exception e ) {
    //
    // }
    // }

    // private void setHomeScreen ( String url ) {
    // int SDK_INT = android.os.Build.VERSION.SDK_INT;
    // if ( SDK_INT > 8 ) {
    // StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder ( )
    // .permitAll ( ).build ( );
    // StrictMode.setThreadPolicy ( policy );
    // }
    // try {
    // if ( android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N ) {
    // try {
    // WallpaperManager.getInstance ( getReactApplicationContext ( ) ).setStream (
    // drawableStream ( url ) , null , true , WallpaperManager.FLAG_SYSTEM );
    // } catch ( IOException e ) {
    // e.printStackTrace ( );
    // }
    // }
    // } catch ( Exception e ) {
    //
    // }
    // }

    // private void setWallpaperImage ( String url ) {
    // int SDK_INT = android.os.Build.VERSION.SDK_INT;
    // if ( SDK_INT > 8 ) {
    // StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder ( )
    // .permitAll ( ).build ( );
    // StrictMode.setThreadPolicy ( policy );
    // }
    // try {
    // final WallpaperManager wallpaperManager = WallpaperManager.getInstance (
    // getReactApplicationContext ( ) );
    // try {
    // wallpaperManager.setBitmap ( drawableFromUrl ( url ) );
    // } catch ( IOException e ) {
    // e.printStackTrace ( );
    // }
    // } catch ( Exception e ) {
    //
    // }
    // }

    // public static Bitmap drawableFromUrl ( String url ) throws IOException {
    // Bitmap x = null;
    // InputStream input = null;
    //
    // try {
    // HttpURLConnection connection = ( HttpURLConnection ) new URL ( url
    // ).openConnection ( );
    //
    // connection.connect ( );
    // input = connection.getInputStream ( );
    // x = BitmapFactory.decodeStream ( input );
    //
    // } catch ( Exception e ) {
    // e.printStackTrace ( );
    // }
    // return x;
    // }

    // public static InputStream drawableStream ( String url ) throws IOException {
    // InputStream input = null;
    //
    // try {
    // HttpURLConnection connection = ( HttpURLConnection ) new URL ( url
    // ).openConnection ( );
    //
    // connection.connect ( );
    // input = connection.getInputStream ( );
    // } catch ( Exception e ) {
    // e.printStackTrace ( );
    // }
    // return input;
    // }

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
