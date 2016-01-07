package com.myproject;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;

import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.smixx.reactnativeicons.ReactNativeIcons;
import com.chymtt.reactnativedropdown.DropdownPackage;
import android.content.Intent; // import
import com.imagepicker.ImagePickerPackage; // import
import io.neson.react.notification.NotificationPackage;
import com.syarul.rnalocation.RNALocation;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import android.support.v4.app.FragmentActivity;
import me.nucleartux.date.ReactDatePackage;
import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import com.chymtt.reactnativecalendar.CalendarPackage;
import com.rhaker.reactnativesmsandroid.RNSmsAndroidPackage;
import com.kwaak.reacttwo.CirclesPackage;

public class MainActivity extends FragmentActivity implements DefaultHardwareBackBtnHandler {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;
    private ImagePickerPackage mImagePicker;
    private RNSmsAndroidPackage mRNSmsAndroidPackage;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);
        mRNSmsAndroidPackage = new RNSmsAndroidPackage(this);
        mImagePicker = new ImagePickerPackage(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new CirclesPackage())  
                .addPackage(mRNSmsAndroidPackage)
                .addPackage(new ReactDatePackage(this))
                .addPackage(new CalendarPackage())
                .addPackage(new ReactNativeDialogsPackage(this))
                .addPackage(new ReactNativeContacts())
                .addPackage(new RNALocation())
                .addPackage(new NotificationPackage(this))
                .addPackage(new DropdownPackage())
                .addPackage(new ReactNativeIcons())
                .addPackage(mImagePicker)
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "MyProject", null);

        setContentView(mReactRootView);
    }
    @Override
        public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
            super.onActivityResult(requestCode, resultCode, data);

            // handle onActivityResult
            mImagePicker.handleActivityResult(requestCode, resultCode, data);
        }
    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
      if (mReactInstanceManager != null) {
        mReactInstanceManager.onBackPressed();
      } else {
        super.onBackPressed();
      }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
      super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onResume(this, this);
        }
    }
}
