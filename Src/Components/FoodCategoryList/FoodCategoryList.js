import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Custom Components
import { foodCategories } from "../../Context/Data/foodCatergories";
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';

const FoodCategoryList = ({ selectedId, setSelectedId, showAll }) => {
  const dataToShow = showAll ? foodCategories : foodCategories.slice(0, 4);

  const renderItem = (item) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          showAll ? styles.modalItem : styles.item,
          isSelected && { backgroundColor: Colors.PrimaryOrange },
        ]}
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.7}
      >
        <Image
          source={item.image}
          style={showAll ? styles.modalImage : styles.image}
        />
        <Text
          style={[
            TextStyles.M14N60,
            isSelected && { color: Colors.Neutral10 },
            showAll && TextStyles.M16N60,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  if (!showAll) {
    // Top 4 in a row
    return <View style={styles.row}>{dataToShow.map(renderItem)}</View>;
  }

  // Show all in modal (grid)
  return (
    <View style={styles.gridContainer}>
      {dataToShow.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp(3.1),
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: hp(2.95),
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: hp(1),
    backgroundColor: Colors.Neutral10,
    width: hp(7.3),
    height: hp(8),
  },
  image: {
    width: hp(3),
    height: hp(3),
    marginBottom: hp(0.5),
  },
  modalItem: {
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: hp(1),
    backgroundColor: Colors.Neutral10,
    marginBottom: hp(2),
    width: '47%',
    height: hp(18),
    elevation: 2
  },
  modalImage: {
    width: hp(6),
    height: hp(6),
    marginBottom: hp(1),
  },
});

export default FoodCategoryList;
