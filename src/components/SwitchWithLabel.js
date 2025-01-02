import { Switch, Text, View } from 'react-native';

const SwitchWithLabel = (props) => {
  const { label, style, value, onValueChange, onChange } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={style}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} onChange={onChange} />
    </View>
  );
};

export default SwitchWithLabel;
