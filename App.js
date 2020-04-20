/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  NimbleEmoji,
  NimblePicker,
  EmojiButton,
  ModalPicker,
} from 'emoji-mart-native';
import data from 'emoji-mart-native/data/all.json';
import dataRequires from 'emoji-mart-native/data/local-images/all';

const {emojis: localEmojis} = dataRequires;

const localSpriteSheets = {
  apple: {
    '16': require('./node_modules/emoji-datasource-apple/img/apple/sheets/16.png'),
    '20': require('./node_modules/emoji-datasource-apple/img/apple/sheets/20.png'),
    '32': require('./node_modules/emoji-datasource-apple/img/apple/sheets/32.png'),
    '64': require('./node_modules/emoji-datasource-apple/img/apple/sheets/64.png'),
  },
  google: {
    '16': require('./node_modules/emoji-datasource-google/img/google/sheets/16.png'),
    '20': require('./node_modules/emoji-datasource-google/img/google/sheets/20.png'),
    '32': require('./node_modules/emoji-datasource-google/img/google/sheets/32.png'),
    '64': require('./node_modules/emoji-datasource-google/img/google/sheets/64.png'),
  },
  twitter: {
    '16': require('./node_modules/emoji-datasource-twitter/img/twitter/sheets/16.png'),
    '20': require('./node_modules/emoji-datasource-twitter/img/twitter/sheets/20.png'),
    '32': require('./node_modules/emoji-datasource-twitter/img/twitter/sheets/32.png'),
    '64': {uri: 'twitter_emoji_64'},
  },
  facebook: {
    '16': require('./node_modules/emoji-datasource-facebook/img/facebook/sheets/16.png'),
    '20': require('./node_modules/emoji-datasource-facebook/img/facebook/sheets/20.png'),
    '32': require('./node_modules/emoji-datasource-facebook/img/facebook/sheets/32.png'),
    '64': require('./node_modules/emoji-datasource-facebook/img/facebook/sheets/64.png'),
  },
};

export default class App extends Component {
  state = {
    set: 'twitter',
    selectedEmoji: {id: 'department_store', colons: ':department_store:'},
    showEmojiPicker: false,
  };
  emojiSelectTrigger = emoji => {
    this.setState({selectedEmoji: emoji});
  };

  showPickerTrigger = visible => {
    this.setState({modalVisible: visible});
  };

  onPressApple = () => {
    this.setState({set: 'apple'});
  };

  onPressGoogle = () => {
    this.setState({set: 'google'});
  };

  onPressTwitter = () => {
    this.setState({set: 'twitter'});
  };

  onPressFacebook = () => {
    this.setState({set: 'facebook'});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Emoji Mart Native</Text>
        </View>
        <View style={styles.previewContainer}>
          <NimbleEmoji
            emoji={this.state.selectedEmoji}
            set={this.state.set}
            skin={this.state.selectedEmoji.skin}
            size={64}
            data={data}
            spriteSheetFn={(set, sheetSize) =>
              localSpriteSheets[set][sheetSize]
            }
            fallback={emoji => {
              return `:${emoji.short_names[0]}:`;
            }}
          />
          <Text>{this.state.selectedEmoji.colons}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              this.state.set === 'apple' ? styles.btnActive : null,
            ]}
            onPress={this.onPressApple}>
            <Text>apple</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              this.state.set === 'google' ? styles.btnActive : null,
            ]}
            onPress={this.onPressGoogle}>
            <Text>google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              this.state.set === 'twitter' ? styles.btnActive : null,
            ]}
            onPress={this.onPressTwitter}>
            <Text>twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              this.state.set === 'facebook' ? styles.btnActive : null,
            ]}
            onPress={this.onPressFacebook}>
            <Text>facebook</Text>
          </TouchableOpacity>
        </View>
        <NimblePicker
          set={this.state.set}
          data={data}
          spriteSheetFn={(set, sheetSize) => localSpriteSheets[set][sheetSize]}
          onSelect={this.emojiSelectTrigger}
        />
        <View style={styles.openModalText}>
          <Text>Open picker as modal </Text>
          <EmojiButton
            onButtonPress={() => {
              this.showPickerTrigger(true);
            }}
          />
        </View>
        <ModalPicker
          isVisible={this.state.modalVisible}
          showCloseButton={true}
          onPressClose={() => {
            this.showPickerTrigger(false);
          }}
          set={this.state.set}
          data={data}
          useLocalImages={localEmojis}
          onSelect={emoji => {
            this.emojiSelectTrigger(emoji);
            this.showPickerTrigger(false);
          }}
          theme="auto"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 25,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  openModalText: {
    flexDirection: 'row',
    marginTop: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btn: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 5,
    marginBottom: 5,
  },
  btnActive: {
    borderColor: '#ae65c5',
  },
  btnText: {
    fontSize: 24,
  },
});
