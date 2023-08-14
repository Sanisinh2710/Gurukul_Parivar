package com.gurukul_parivar;
import android.app.WallpaperManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import android.util.Log;

import androidx.annotation.NonNull;

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
    WallpaperModule(ReactApplicationContext context){
        super(context);

        context.addLifecycleEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "WallpaperModule";
    }

    @ReactMethod
    public void setAsWallpaper(String fileURL, final Promise promise){
        try {
            URL url = new URL(fileURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap bitmap = BitmapFactory.decodeStream(input);

            WallpaperManager wallpaperManager = WallpaperManager.getInstance(getReactApplicationContext());
            wallpaperManager.setBitmap(bitmap);

            promise.resolve("SUCCESS");
        } catch (IOException e) {
            promise.reject("ERROR", "Error setting wallpaper", e);
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
        Log.d("Host destroy","Destroy");
    }
}
