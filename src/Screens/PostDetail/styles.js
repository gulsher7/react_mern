import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import { height, moderateScale, moderateScaleVertical, textScale, width } from "../../styles/responsiveSize";
import fontFamily from "../../styles/fontFamily";



// define your styles
const styles = StyleSheet.create({
   bottomStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateScale(12),
      paddingVertical: moderateScaleVertical(16)
   },
   boxStyle: {
      backgroundColor: colors.gray2,
      borderRadius: moderateScale(8),
      padding: moderateScale(12)
   },
   profileImage: {
      width: moderateScale(60),
      height: moderateScale(60),
      borderRadius: moderateScale(30),
      marginRight: moderateScale(16)
   },
   nameStyle: {
      fontSize: textScale(16),
      fontFamily: fontFamily.medium,
      color: colors.whiteColor,
   },
   bioStyle: {
      fontSize: textScale(12),
      fontFamily: fontFamily.medium,
      color: colors.whiteColorOpacity50,
      marginTop: moderateScaleVertical(4)
   },
   postImage: {
      width: '100%',
      height: height / 2.8,
      borderRadius: moderateScale(8),
      marginRight: moderateScale(16),
      marginVertical: moderateScaleVertical(16)
   },
   descStyle: {
      fontSize: textScale(14),
      fontFamily: fontFamily.regular,
   },
   flexHorizontal: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between",
   },
   notDataFound: {
      fontSize: textScale(24),
      fontFamily: fontFamily.regular,
      
   }
});

export default styles