package com.gurukul_parivar;

import android.app.WallpaperManager;
import android.content.Context;
import android.graphics.Bitmap;

import android.graphics.BitmapFactory;
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

import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayOutputStream;

public class WallpaperModule extends ReactContextBaseJavaModule implements  LifecycleEventListener {
    // private static final int RESULT_OK = 200;
    // private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener( ) {
    //     @Override
    //     public void onActivityResult(Activity activity, int requestCode, int resultCode, @Nullable Intent data) {
    //         super.onActivityResult( activity, requestCode, resultCode, data );
    //         Log.d( "0", "came" );

    //         if ( data != null ) {
    //             Log.d( "1", "came" );

    //             Log.d( "2", "came" );

    //             Uri imageUri = data.getData( );
    //             Log.d( "3", imageUri.toString());

    //             try {
    //                 Bitmap bitmap = BitmapFactory.decodeStream( getReactApplicationContext().getContentResolver().openInputStream( imageUri ) );
    //                 //set image bitmap to image view
    //                 Log.d( "4", bitmap.toString() );

    //                 if ( bitmap != null ) {

    //                     if ( requestCode == 1 ) {
    //                         Log.d( "Mode", "HOME" );
    //                         try {
    //                             setOnHomeScreenWallPaper( bitmap );
    //                         } catch ( Exception e ) {
    //                             Toast.makeText( getReactApplicationContext( ), "Error setting Home wallpaper", Toast.LENGTH_SHORT ).show( );
    //                         }
    //                     }
    //                     if ( requestCode == 2 ) {
    //                         Log.d( "Mode", "LOCK" );
    //                         try {
    //                             setOnLockScreenWallPaper( bitmap );
    //                         } catch ( Exception e ) {
    //                             Toast.makeText( getReactApplicationContext( ), "Error setting Lock wallpaper", Toast.LENGTH_SHORT ).show( );
    //                         }
    //                     }
    //                     if ( requestCode == 3 ) {
    //                         Log.d( "Mode", "BOTH" );
    //                         try {
    //                             setOnHomeScreenWallPaper( bitmap );
    //                             setOnLockScreenWallPaper( bitmap );
    //                         } catch ( Exception e ) {
    //                             Toast.makeText( getReactApplicationContext( ), "Error setting Both wallpaper", Toast.LENGTH_SHORT ).show( );
    //                         }
    //                     }
    //                 }
    //             } catch ( IOException e ) {
    //                 throw new RuntimeException( e );
    //             }

    //         }

    //     }
    // };

    WallpaperModule(ReactApplicationContext context) {
        super( context );
       context.addLifecycleEventListener ( ( LifecycleEventListener ) this );
        // context.addActivityEventListener( mActivityEventListener );
    }

    @NonNull
    @Override
    public String getName( ) {
        return "WallpaperModule";
    }

    public Uri getImageUri(Context inContext, Bitmap inImage) {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream( );
        inImage.compress( Bitmap.CompressFormat.JPEG, 100, bytes );
        String path = MediaStore.Images.Media.insertImage( inContext.getContentResolver( ), inImage, "Title", null );
        return Uri.parse( path );
    }

    @ReactMethod
    public Promise setAsWallpaper(String fileURL, String mode, final Promise promise) {
        try {
            RequestOptions requestOptions = new RequestOptions( );
            requestOptions.override( 1080, 1920 ) // Set your desired width and height here
                    .format( DecodeFormat.PREFER_RGB_565 ) // Adjust format for better memory usage
                    .fitCenter( ) // Scale image while keeping aspect ratio
                    // .transform( new CutOffLogo( ) )
                    .diskCacheStrategy( DiskCacheStrategy.RESOURCE );


            Glide.with( getReactApplicationContext( ) ).asBitmap( ).load( fileURL ).apply( requestOptions ).into( new SimpleTarget< Bitmap >( ) {
                @Override
                public void onResourceReady(@NonNull Bitmap resource, @Nullable Transition< ? super Bitmap > transition) {
                    try {
                        ByteArrayOutputStream outputStream = new ByteArrayOutputStream( );
                        resource.compress( Bitmap.CompressFormat.JPEG, 80, outputStream );

                        byte[] compressedData = outputStream.toByteArray( );
                        Bitmap compressedBitmap = BitmapFactory.decodeByteArray( compressedData, 0, compressedData.length );
                        // Uri uri = getImageUri( getReactApplicationContext( ), compressedBitmap );

                        // Intent cropIntent = new Intent( "com.android.camera.action.CROP" );
                        // //indicate image type and Uri of image
                        // cropIntent.setDataAndType( uri, "image/*" );
                        // //set crop properties
                        // cropIntent.putExtra( "crop", "true" );
                        // //indicate aspect of desired crop
                        // cropIntent.putExtra( "aspectX", 1 );
                        // cropIntent.putExtra( "aspectY", 1 );
                        // //indicate output X and Y
                        // cropIntent.putExtra( "outputX", 256 );
                        // cropIntent.putExtra( "outputY", 256 );
                        // //retrieve data on return
                        // cropIntent.putExtra( "return-data", true );
                        // cropIntent.putExtra( "mode", mode.toString( ) );
                        // //start the activity - we handle returning in onActivityResult
                        // getCurrentActivity( ).startActivityForResult( cropIntent, mode.equals( "HOME" ) ? 1 : mode.equals( "LOCK" ) ? 2 : 3 );


                       if ( mode.equals ( "HOME" ) ) {
                           try {
                               setOnHomeScreenWallPaper ( compressedBitmap );
//                                var path = MediaStore.Images.Media.insertImage ( getReactApplicationContext ().getContentResolver (), compressedBitmap,"wallpaper.jpg",null );
//                                Intent intent = new Intent ( WallpaperManager.getInstance ( getReactApplicationContext () ).getCropAndSetWallpaperIntent ( Uri.parse ( path ) ) );
//                                intent.putExtra("android.wallpaper.extra.SCREEN_TO_SET", WallpaperManager.FLAG_SYSTEM);
//                                getCurrentActivity ().startActivity ( intent );
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
                        promise.reject( "ERROR", "Error setting wallpaper", e );
                    }
                    promise.resolve( "SUCCESS" );
                }
            } );
        } catch ( Exception e ) {
            promise.reject( "ERROR", "Error setting wallpaper", e );
        }
        return promise;
    }

//    public void startCropping( Uri sourceUri, Uri destinationuri ) {
//        UCrop.of( sourceUri, destinationuri )
//                .withAspectRatio( 5f, 5f )
//                .start( getCurrentActivity( ) );
//    }

    public void setOnHomeScreenWallPaper(Bitmap bitmap) throws Exception {
        try {
            WallpaperManager wallpaperManager = WallpaperManager.getInstance( getReactApplicationContext( ) );
            if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
               var wallpaper = getCroppedBitmap( bitmap, wallpaperManager );
                wallpaperManager.setBitmap( wallpaper, null, true, WallpaperManager.FLAG_SYSTEM );
            } else {
                var wallpaper = getCroppedBitmap( bitmap, wallpaperManager );
                wallpaperManager.setBitmap( wallpaper );
            }
        } catch ( Exception e ) {
            throw e;
        }
    }

    public void setOnLockScreenWallPaper(Bitmap bitmap) throws Exception {
        try {
            WallpaperManager wallpaperManager = WallpaperManager.getInstance( getReactApplicationContext( ) );
            if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.N ) {
               var wallpaper = getCroppedBitmap( bitmap, wallpaperManager );
                wallpaperManager.setBitmap( wallpaper, null, true, WallpaperManager.FLAG_LOCK );
            } else {
                var wallpaper = getCroppedBitmap( bitmap, wallpaperManager );
                wallpaperManager.setBitmap( wallpaper );
            }
        } catch ( Exception e ) {
            throw e;
        }
    }

    public Bitmap getCroppedBitmap(Bitmap bitmap, WallpaperManager wallpaperManager) {
        DisplayMetrics metrics = new DisplayMetrics( );
        Display display = getCurrentActivity( ).getWindowManager( ).getDefaultDisplay( );
        display.getMetrics( metrics );
        final int screenWidth = metrics.widthPixels;
        final int screenHeight = metrics.heightPixels;

        wallpaperManager.suggestDesiredDimensions( screenWidth, screenHeight );

        final float width = wallpaperManager.getDesiredMinimumWidth( ) + 100;
        final float height = wallpaperManager.getDesiredMinimumHeight( );

        Bitmap wallpaper = Bitmap.createScaledBitmap( bitmap, ( int ) width, ( int ) height, true );

        return wallpaper;
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


// class CutOffLogo extends BitmapTransformation {

//     @Override
//     protected Bitmap transform(
//             @NotNull BitmapPool pool,
//             @NotNull Bitmap toTransform,
//             int outWidth,
//             int outHeight
//     ) {

//         return Bitmap.createBitmap(
//                 toTransform,
//                 0,
//                 0,
//                 toTransform.getWidth( ),
//                 toTransform.getHeight( ) - 20   // number of pixels
//         );
//     }

//     @Override
//     public void updateDiskCacheKey(@NonNull MessageDigest messageDigest) {

//     }
// }