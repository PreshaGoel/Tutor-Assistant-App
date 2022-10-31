import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Dropdown as DropdownPicker} from 'react-native-element-dropdown';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {font_Bold} from '../constants/fonts';
import {greyColor, primaryColor} from '../constants/colors';

const Dropdown = ({inputs, value, setValue, icon = 'Safety'}) => {
  return (
    <View style={styles.container}>
      <DropdownPicker
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.dropdownContainer}
        search
        data={inputs}
        labelField={'label'}
        valueField={'value'}
        value={value}
        onChange={text => {
          setValue(text.value);
        }}
        dropdownPosition="bottom"
        placeholder={value}
        searchPlaceholder="Search..."
        renderLeftIcon={() => (
          <AntDesignIcon
            style={styles.icon}
            color={primaryColor}
            name={icon}
            size={24}
          />
        )}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  dropdownContainer: {
    borderWidth: 2,
    borderColor: greyColor,
    elevation: 5,
    borderRadius: 15,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: primaryColor,
    fontFamily: font_Bold,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
