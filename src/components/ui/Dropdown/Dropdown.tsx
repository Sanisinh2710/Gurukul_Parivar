import {Dispatch, SetStateAction, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils/colors';
import {Dropdownstyles} from './styles';

interface Props {
  placeholder: string;
  dataObject: any;
  selectedItem: string;
  setselectedItem: Dispatch<SetStateAction<string>>;
}

const Dropdown = ({
  placeholder,
  dataObject,
  selectedItem,
  setselectedItem,
}: Props) => {
  const styles = Dropdownstyles();
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(dataObject);

  const onSearch = (search: string) => {
    if (search !== '') {
      let tempData = dataObject.filter((item: any) => {
        return item.item.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(dataObject);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.contentView}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={styles.placeholderFonts}>
          {selectedItem == '' ? placeholder : selectedItem}
        </Text>
        {clicked ? (
          <Icon
            name="chevron-down-circle-outline"
            size={25}
            color={COLORS.primaryColor}
          />
        ) : (
          <Icon
            name="chevron-up-circle-outline"
            size={25}
            color={COLORS.primaryColor}
          />
        )}
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={clicked}
        onRequestClose={() => {
          setClicked(!clicked);
        }}>
        <View style={styles.mainView}>
          <View style={styles.modelView}>
            <Pressable
              style={styles.button}
              onPress={() => setClicked(!clicked)}
            />
            <Text></Text>
            <TextInput
              placeholder="Search.."
              value={search}
              onChangeText={txt => {
                onSearch(txt);
                setSearch(txt);
              }}
              style={styles.searchInput}
            />
            <FlatList
              data={data}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={styles.ListView}
                      onPress={() => {
                        setselectedItem(item.item);
                        setClicked(!clicked);
                        onSearch('');
                        setSearch('');
                      }}>
                      <Text style={styles.ListFonts}>{item.item}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;
