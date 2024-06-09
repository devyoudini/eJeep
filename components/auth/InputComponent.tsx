import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

type CustomProps = {
  iconName?: "email" | "password";
  hidden?: boolean;
  onPress: () => void;
};

type InputProps = Partial<TextInputProps & CustomProps>;

const Input: React.FunctionComponent<InputProps> = ({
  iconName,
  placeholder,
  onChangeText,
  textContentType,
  hidden,
  inputMode,
  value,
}) => {
  const [hideText, setHideText] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const progress = useDerivedValue(() => {
    return withTiming(isFocused ? 1 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    });
  });

  const animatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      ["#e2e2e2", "#000000"]
    );

    return { borderColor };
  });

  const onHideText = () => {
    setHideText(!hideText);
    // Call the onPress function when hiding/showing text
  };

  return (
    <Animated.View style={[styles.inputContainer, animatedStyle]}>
      {iconName ? (
        <MaterialIcons
          name={iconName}
          size={24}
          color="gray"
          style={styles.icon}
        />
      ) : null}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        textContentType={textContentType}
        secureTextEntry={hidden ? hideText : false}
        inputMode={inputMode}
        autoCapitalize="none"
        onFocus={() => {
          setIsFocused(!isFocused);
        }}
        onBlur={() => {
          setIsFocused(!isFocused);
        }}
      />
      {hidden ? (
        <TouchableOpacity onPress={onHideText}>
          <MaterialCommunityIcons
            name={hideText ? "eye-off" : "eye"}
            size={24}
            color="gray"
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : null}
    </Animated.View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 10,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
});
