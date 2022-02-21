import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';

function RegisterScreen({ navigation, route }) {
  const [webHeight, setWebHeight] = useState(100);
  const webViewScript = `
    setTimeout(function() { 
        window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
    }, 500);
    true; // note: this is required, or you'll sometimes get silent failures
    `;

  return (
    <ScreenWrapper
      style={{
        backgroundColor:
          route.params.type === 'Individual' ? colors.yellow : colors.primary,
      }}
    >
      <WebView
        opacity={0.99}
        originWhitelist={['*']}
        source={{
          uri:
            route.params.type === 'Individual'
              ? 'https://yasalam.vercel.app/register/individual'
              : 'https://yasalam.vercel.app/register/family',
        }}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
        onMessage={(event) => {
          setWebHeight(parseInt(event.nativeEvent.data));
        }}
        javaScriptEnabled={true}
        injectedJavaScript={webViewScript}
        domStorageEnabled={true}
      />
    </ScreenWrapper>
  );
}

export default RegisterScreen;
