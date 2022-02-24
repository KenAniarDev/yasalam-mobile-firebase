import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';
import useStore from '../hooks/useStore';

function AddSpouseScreen({ navigation }) {
  const member = useStore((state) => state.member);
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
        backgroundColor: colors.secondary,
      }}
    >
      <WebView
        opacity={0.99}
        originWhitelist={['*']}
        source={{
          uri: `https://yasalam.vercel.app/register/secondary?id=${
            member.id
          }&otp=${member.otp}&gender=${
            member.gender === 'male' ? 'female' : 'male'
          }`,
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

export default AddSpouseScreen;
