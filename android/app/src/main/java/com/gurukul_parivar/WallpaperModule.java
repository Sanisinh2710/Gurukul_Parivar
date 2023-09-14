package com.gurukul_parivar;

import static android.provider.MediaStore.Images.Media.getBitmap;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.WallpaperManager;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;

import android.graphics.BitmapFactory;
import android.graphics.Point;
import android.graphics.Rect;
import android.graphics.RectF;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DecodeFormat;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

public class WallpaperModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_CROPPER_CANCELLED = "E_CROPPER_CANCELLED";
    private static final String E_FAILED_TO_LOAD_IMAGE = "E_FAILED_TO_LOAD_IMAGE";
    private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";
    private Promise mPickerPromise;
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener () {
        @Override
        public void onActivityResult( Activity activity, int requestCode, int resultCode, Intent intent) {
           super.onActivityResult ( activity,requestCode,resultCode,intent );
            Log.d ( "1","Came" );
            if (requestCode == 1 || requestCode==2 || requestCode==3) {
                Log.d ( "2","Came" );
                if (mPickerPromise != null) {
                    Log.d ( "3","Came" );
                    if (resultCode == Activity.RESULT_CANCELED) {
                        Log.d ( "4","Came" );
                        mPickerPromise.reject(E_CROPPER_CANCELLED, "Cropper was cancelled");
                    } else if (resultCode == Activity.RESULT_OK) {
                        Log.d ( "5","Came" );
                        Uri uri = intent.getData();
                        Log.d ( "6",uri.toString () );

                        if (uri == null) {
                            mPickerPromise.reject(E_NO_IMAGE_DATA_FOUND, "No image data found");
                        } else {
                            Bitmap bitmap = getBitmapFromUri ( getReactApplicationContext (), uri );

                            Log.d ( "Got bitmap", bitmap.toString () );

                            if(bitmap!=null)
                            {
                                if ( requestCode==1 ) {
                                    try {
                                        setOnHomeScreenWallPaper ( bitmap );
                                    } catch ( Exception e ) {
                                        mPickerPromise.reject ( "ERROR" , "Error setting Home wallpaper" , e );
                                    }
                                }
                                if ( requestCode==2 ) {
                                    if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
                                        try {
                                            setOnLockScreenWallPaper ( bitmap );
                                        } catch ( Exception e ) {
                                            mPickerPromise.reject ( "ERROR" , "Error setting LOCK wallpaper" , e );
                                        }
                                    }
                                }
                                if ( requestCode==3 ) {
                                    try {
                                        setOnHomeScreenWallPaper ( bitmap );
                                        setOnLockScreenWallPaper ( bitmap );
                                    } catch ( Exception e ) {
                                        mPickerPromise.reject ( "ERROR" , "Error setting BOTH wallpaper" , e );
                                    }
                                }
                                mPickerPromise.resolve("SUCCESS");
                            }
                        }
                    }
                    mPickerPromise = null;
                }
            }
        }
    };

    WallpaperModule ( ReactApplicationContext context ) {
        super ( context );
        context.addLifecycleEventListener ( this );
        context.addActivityEventListener ( mActivityEventListener );
    }

    @NonNull
    @Override
    public String getName ( ) {
        return "WallpaperModule";
    }

    public Uri getFileUriFromBitmap( Context context, Bitmap bitmap) {
        try {
            // Create a unique filename
            String filename = "bitmap_" + System.currentTimeMillis() + ".jpg";

            // Get the directory where you want to save the file (e.g., Pictures directory)
            File directory = context.getExternalFilesDir( Environment.DIRECTORY_PICTURES);

            // Create a file object
            File file = new File(directory, filename);

            // Compress the bitmap to the file
            FileOutputStream outputStream = new FileOutputStream (file);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, outputStream);
            outputStream.flush();
            outputStream.close();

            // Return the URI of the saved file
            return Uri.parse (Uri.fromFile(file).toString ());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Uri getImageUri(Context inContext, Bitmap inImage) {
        String path = MediaStore.Images.Media.insertImage( inContext.getContentResolver( ), inImage, "Title", null );
        return Uri.parse( path );
    }

    public Bitmap getBitmapFromUri(Context context, Uri uri) {
        try {
            ContentResolver contentResolver = context.getContentResolver();
            InputStream inputStream = contentResolver.openInputStream(uri);

            if (inputStream != null) {
                // Decode the InputStream into a Bitmap
                return BitmapFactory.decodeStream(inputStream);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @SuppressLint("CheckResult") 
    @ReactMethod
    public void setAsWallpaper ( String remoteURL , String mode , final Promise promise ) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        // Store the promise to resolve/reject when picker returns data
        mPickerPromise = promise;

        try {
            RequestOptions requestOptions = new RequestOptions ();
            requestOptions.override(1080, 1920) // Set your desired width and height here
                    .format( DecodeFormat.PREFER_RGB_565) // Adjust format for better memory usage
                    .fitCenter () // Scale image while keeping aspect ratio
                    .diskCacheStrategy( DiskCacheStrategy.RESOURCE);

            Glide.with ( getReactApplicationContext () ).asBitmap ().load ( remoteURL ).apply (requestOptions).into ( new SimpleTarget<Bitmap> ( ) {
                @Override
                public void onResourceReady ( @NonNull Bitmap resource , @Nullable Transition<? super Bitmap> transition ) {
                    try {
                        ByteArrayOutputStream outputStream = new ByteArrayOutputStream (  );
                        resource.compress ( Bitmap.CompressFormat.JPEG, 80, outputStream );

                        byte[] compressedData = outputStream.toByteArray();
                        Bitmap compressedBitmap = BitmapFactory.decodeByteArray(compressedData, 0, compressedData.length);

//                        Uri uri = getImageUri ( getReactApplicationContext (), compressedBitmap );
//
//                        Log.d ( "URI", uri.toString () );
//
//                        Intent cropIntent = new Intent( "com.android.camera.action.CROP" );
//                        //indicate image type and Uri of image
//                        cropIntent.setDataAndType( uri, "image/*" );
//                        //set crop properties
//                        cropIntent.putExtra( "crop", "true" );
//                        //indicate aspect of desired crop
//                        cropIntent.putExtra( "aspectX", 1 );
//                        cropIntent.putExtra( "aspectY", 1 );
//                        //indicate output X and Y
//                        cropIntent.putExtra( "outputX", 256 );
//                        cropIntent.putExtra( "outputY", 256 );
//                        //retrieve data on return
//                        cropIntent.putExtra( "return-data", true );
//                        //start the activity - we handle returning in onActivityResult
//                        getCurrentActivity( ).startActivityForResult( cropIntent, mode.equals( "HOME" ) ? 1 : mode.equals( "LOCK" ) ? 2 : 3 );

                        if ( mode.equals ( "HOME" ) ) {
                            try {
                                setOnHomeScreenWallPaper ( compressedBitmap );
                            } catch ( Exception e ) {
                                mPickerPromise.reject ( "ERROR" , "Error setting Home wallpaper" , e );
                            }
                        }
                        if ( mode.equals ( "LOCK" ) ) {
                            if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
                                try {
                                    setOnLockScreenWallPaper ( compressedBitmap );
                                } catch ( Exception e ) {
                                    mPickerPromise.reject ( "ERROR" , "Error setting LOCK wallpaper" , e );
                                }
                            }
                        }
                        if ( mode.equals ( "BOTH" ) ) {
                            try {
                                setOnHomeScreenWallPaper ( compressedBitmap );
                                setOnLockScreenWallPaper ( compressedBitmap );
                            } catch ( Exception e ) {
                                mPickerPromise.reject ( "ERROR" , "Error setting BOTH wallpaper" , e );
                            }
                        }
                    } catch ( Exception e ) {
                        mPickerPromise.reject ( "ERROR" , "Error setting wallpaper" , e );
                    }
                    mPickerPromise.resolve ( "SUCCESS" );
                }
            } );

        } catch (Exception e) {
            mPickerPromise.reject(E_FAILED_TO_LOAD_IMAGE, e);
            mPickerPromise = null;
        }
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
                var wallpaper = getCroppedBitmap ( bitmap, wallpaperManager );
                wallpaperManager.setBitmap ( wallpaper );
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
                var wallpaper = getCroppedBitmap ( bitmap, wallpaperManager );
                wallpaperManager.setBitmap ( wallpaper );
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

