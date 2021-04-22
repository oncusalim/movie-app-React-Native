import React, { useEffect } from 'react';
import admob, { BannerAd, BannerAdSize, TestIds, MaxAdContentRating } from '@react-native-firebase/admob';
import { BANNER_ID } from "@env"
const adUnitIdBanner = __DEV__ ? TestIds.BANNER : BANNER_ID;





export const ReklamBanner = () => {

  useEffect(() => {
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
  }, [])


  return (
    <BannerAd
      unitId={adUnitIdBanner}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}

