import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { INTER_ID } from "@env"
import admob, { InterstitialAd, AdEventType, TestIds, MaxAdContentRating } from '@react-native-firebase/admob';



const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : INTER_ID;
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


export const ReklamInter = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: false,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });

    // Start loading the interstitial straight away
    interstitial.load();

    loaded ? interstitial.show() : null

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, [loaded]);

  // No advert ready to show yet





  return (
    <View></View>
  )


}
