# SmartFleet_App_Admin

#### 调试说明：
1. 隐藏```react-navigation```的导航栏下的横线和android的title居中

将`react-navigation/src/views/Header/Header.js`中的第558行下的代码注释掉
```
let platformContainerStyles;
// if (Platform.OS === 'ios') {
//   platformContainerStyles = {
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: '#A7A7AA',
//   };
// } else {
//   platformContainerStyles = {
//     shadowColor: 'black',
//     shadowOpacity: 0.1,
//     shadowRadius: StyleSheet.hairlineWidth,
//     shadowOffset: {
//       height: StyleSheet.hairlineWidth,
//     },
//     elevation: 4,
//   };
// }
```
将`react-navigation/src/views/Header/Header.js`中的第626行代码
```
    justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
```
修改为：
```
justifyContent: 'center',
```
2. 修改启动白屏问题

参考文档：[react-native-splash-screen](https://github.com/leomayleomay/react-native-splash-screen/blob/master/README.zh.md#安装说明)

注意```/node_modules/react-native-splash-screen/android/src/build.gradle```下的代码中的sdk版本号。
```
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.0.1' //注意版本号
    compile "com.facebook.react:react-native:+"  // From node_modules
}
```
3. 	修改RNFetchBlob组件代码,`node_modules/react-native-fetch-blob/ios/RNFetchBlob/RNFetchBlob.m`文件,在37行下添加如下代码：

    ```c
    + (BOOL)requiresMainQueueSetup {
        return YES;
    }
    ```
    
4. 	修改RNFetchBlob组件代码,`node_modules/react-native-fetch-blob/ios/RNFetchBlobReqBuilder.m`文件,103行将：

    ```c
    if([[method lowercaseString] isEqualToString:@"post"] || [[method lowercaseString] isEqualToString:@"put"] || [[method lowercaseString] isEqualToString:@"patch"]) {
    ```
    修改为
     ```c
    if([[method lowercaseString] isEqualToString:@"post"] || [[method lowercaseString] isEqualToString:@"put"] || [[method lowercaseString] isEqualToString:@"patch"] || [[method lowercaseString] isEqualToString:@"delete"]) {
    ```
    
5. 	修改RNFetchBlob组件代码,`node_modules/react-native-fetch-blob/android/src/main/java/com/RNFetchBlob/RNFetchBlobReq.java`文件,242行将：

    ```java
    if(method.equalsIgnoreCase("post") || method.equalsIgnoreCase("put") || method.equalsIgnoreCase("patch")) {
    ```
    修改为
     ```java
    if(method.equalsIgnoreCase("post") || method.equalsIgnoreCase("put") || method.equalsIgnoreCase("patch") || method.equalsIgnoreCase("delete")) {
    ```

6. 	修改react-native-smart-barcode组件代码,`node_modules/react-native-smart-barcode/ios/RCTBarcode/RCTBarcode/RCTBarcodeManager.m`文件,在269行下添加如下代码：

    ```c
    + (BOOL)requiresMainQueueSetup {
        return YES;
    }
    ```
    
7. 	修改react-native-smart-barcode组件代码,`node_modules/react-native-smart-barcode/Barcode.js`文件,将

    ```js
    import React, {
        PropTypes,
        Component,
    } from 'react'
    import {
        View,
        requireNativeComponent,
        NativeModules,
        AppState,
        Platform,
    } from 'react-native'
    ```
    修改为：
    ```js
    import React, {Component} from 'react'
    import {
        View,
        requireNativeComponent,
        NativeModules,
        AppState,
        Platform,
    } from 'react-native'
    
    import PropTypes from 'prop-types';

    ```
8. react-native-baidu-map ios配置
```
typedef struct RCTMethodInfo { // 这里可能回报 `Redefinition of 'RCTMethodInfo'`错误
  const char *const jsName;
  const char *const objcName;
  const BOOL isSync;
} RCTMethodInfo;
```
##### 解决方案： 
[参考文档](https://blog.csdn.net/qq_37854055/article/details/80283721)
在Xcode中寻找到   BaseModule.h   文件中   RCTBridgeModule.h   的引用
```
 import " RCTBridgeModule.h"
 ```
 修改为:
```
#import "React/RCTBridgeModule.h"
```

还可能报以下错误
```
#import "RCTViewManager.h" // `'RCTViewManager.h' file not found` 
#import "RCTConvert+CoreLocation.h"
#import <BaiduMapAPI_Map/BMKMapView.h>
```
解决办法：
```
#import "RCTViewManager.h"
#import "RCTConvert+CoreLocation.h"
```
改成：
```
#import <React/RCTViewManager.h>
#import <React/RCTConvert+CoreLocation.h>
```
9. react-native-baidu-map android配置
[参考文档](https://blog.csdn.net/sinat_37059404/article/details/73330041)

10. react-native-baidu-map android配置报以下错误
```
/Users/zhanglinfeimacair/workroom/coding/iwos-phone/iwos/node_modules/react-native-baidu-map/android/src/main/java/org/lovebing/reactnative/baidumap/BaiduMapPackage.java:49: 错误: 方法不会覆盖或实现超类型的方法
    @Override
    ^
1 个错误
:react-native-baidu-map:compileReleaseJavaWithJavac FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':react-native-baidu-map:compileReleaseJavaWithJavac'.
> Compilation failed; see the compiler error output for details.

```
解决方法：注释掉/react-native-baidu-map/android/src/main/java/org/lovebing/reactnative/baidumap/BaiduMapPackage.java第49行以下的代码
[参考文档](https://blog.csdn.net/sinat_30949835/article/details/78903007)
```
    ...

    // @Override
    // public List<Class<? extends JavaScriptModule>> createJSModules() {
    //     return Collections.emptyList();
    // }
}
```
11. 将 react-native-baidu-map/js目录下的所用文件中的
```
import React, {
  Component,
  PropTypes
} from 'react';
```
改成
```
import React, { Component } from 'react';
import PropTypes from "prop-types";
```
12. react-native-image-crop-picker配置
iOS配置不要用pod用手动添加
#### 项目会报一下错误
```
dyld: Library not loaded: @rpath/RSKImageCropper.framework/RSKImageCropper
  Referenced from: /var/containers/Bundle/Application/79B80E65-E169-465C-90C6-EE9A270DDA9D/iwos.app/iwos
  Reason: image not found

或

dyld: Library not loaded: @rpath/QBImagePicker.framework/QBImagePicker
  Referenced from: /var/containers/Bundle/Application/79B80E65-E169-465C-90C6-EE9A270DDA9D/iwos.app/iwos
  Reason: image not found
```
错误原因：根据提示是因为Library没有加载到
解决方法：在项目的General->Embedded Binaries中，我们要将自定义的QBImagePicker.framework和RSKImageCropper.framework 添加进去。