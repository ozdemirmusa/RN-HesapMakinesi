/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '0',
      isaret: '',
      ara: '0',
      goster: 0,
      sonuc: '0',
      gecmis: [],
    };
  }
  ekle = rakam => {
    if (this.state.value === '0') {
      this.setState({value: rakam});
      this.hesapla(rakam);
    } else {
      this.hesapla(this.state.value + '' + rakam);
      this.setState({value: this.state.value + '' + rakam});
    }
  };
  isaret = isaret => {
    this.setState({goster: 1});
    let dizi = this.state.gecmis;
    if (this.state.gecmis.length < 1) {
      dizi.push(this.state.value);
      this.setState({gecmis: dizi});
    }
    if (this.state.value !== '0') {
      if (isaret === '+') {
        if (this.state.value.length > 2 && this.state.value[0] === '+') {
          dizi.push(this.state.value);
          this.setState({
            ara: this.state.sonuc.slice(2),
            value: '+ ',
            isaret: '+',
            gecmis: dizi,
          });
        } else {
          if (this.state.value.length > 2 && this.state.value[0] === '=') {
            dizi.push(this.state.value.slice(2));
          } else if (this.state.value.length > 2) {
            dizi.push(this.state.value);
          }
          this.setState({
            ara: this.state.sonuc.slice(2),
            value: '+ ',
            isaret: '+',
            gecmis: dizi,
          });
        }
      } else if (isaret === '-') {
        if (this.state.value.length > 2 && this.state.value[0] === '-') {
          dizi.push(this.state.value);
          this.setState({
            ara: this.state.sonuc.slice(2),
            value: '- ',
            isaret: '-',
            gecmis: dizi,
          });
        } else {
          if (this.state.value.length > 2 && this.state.value[0] === '=') {
            dizi.push(this.state.value.slice(2));
          } else if (this.state.value.length > 2) {
            dizi.push(this.state.value);
          }
          this.setState({
            ara: this.state.sonuc.slice(2),
            value: '- ',
            isaret: '-',
            gecmis: dizi,
          });
        }
      } else if (isaret === 'x') {
        if (this.state.value.length > 2 && this.state.value[0] === 'x') {
          dizi.push(this.state.value);
          this.setState({
            ara: this.state.sonuc.slice(2),
            value: 'x ',
            isaret: 'x',
            gecmis: dizi,
          });
        } else {
          if (this.state.value.length > 2 && this.state.value[0] === '=') {
            dizi.push(this.state.value.slice(2));
          } else if (this.state.value.length > 2) {
            dizi.push(this.state.value);
          }
          this.setState({
            ara: this.state.sonuc.slice(2),
            value: 'x ',
            isaret: 'x',
            gecmis: dizi,
          });
        }
      } else if (isaret === '÷') {
        if (this.state.value.length > 2 && this.state.value[0] === '÷') {
          dizi.push(this.state.value);
          this.setState({
            ara: this.state.sonuc.slice(2),
            value: '÷ ',
            isaret: '÷',
            gecmis: dizi,
          });
        } else {
          if (this.state.value.length > 2 && this.state.value[0] === '=') {
            dizi.push(this.state.value.slice(2));
          } else if (this.state.value.length > 2) {
            dizi.push(this.state.value);
          }
          this.setState({
            ara: this.state.sonuc.slice(2),
            value: '÷ ',
            isaret: '÷',
            gecmis: dizi,
          });
        }
      }
    }
  };
  hesapla = t => {
    if (
      t.length > 2 &&
      this.state.isaret !== '' &&
      (t[0] === '+' || t[0] === '-' || t[0] === 'x' || t[0] === '÷')
    ) {
      let a = t.slice(2);
      let sonuc;
      if (this.state.isaret === '+') {
        sonuc = Number(this.state.ara) + Number(a);
        this.setState({sonuc: '= ' + sonuc, goster: 1});
      } else if (this.state.isaret === '-') {
        sonuc = Number(this.state.ara) - Number(a);
        this.setState({sonuc: '= ' + sonuc, goster: 1});
      } else if (this.state.isaret === 'x') {
        sonuc = Number(this.state.ara) * Number(a);
        this.setState({sonuc: '= ' + sonuc, goster: 1});
      } else if (this.state.isaret === '÷') {
        sonuc = Number(this.state.ara) / Number(a);
        this.setState({sonuc: '= ' + sonuc, goster: 1});
      }
    } else {
      this.setState({sonuc: '= ' + t, goster: 1});
    }
  };
  render() {
    const gecmis = [];
    for (var i = 0; i < this.state.gecmis.length; i++) {
      gecmis.push(
        <Text
          key={i}
          style={{
            fontSize: 24,
            width: Dimensions.get('window').width,
            textAlign: 'right',
          }}>
          {this.state.gecmis[i]}
        </Text>,
      );
    }
    return (
      <View style={styles.main}>
        <View style={styles.yukarisi}>
          <View
            style={{
              backgroundColor: '#d7d7d7',
              width: Dimensions.get('window').width,
              height:
                Dimensions.get('window').height / 2 -
                ((Dimensions.get('window').height / 15) * 2 + 40),
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <ScrollView
              ref={ref => (this.scrollView = ref)}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.scrollView.scrollToEnd({animated: true});
              }}>
              {gecmis}
            </ScrollView>
          </View>
          {this.state.goster === 0 ? (
            <Text
              style={{
                fontSize: Dimensions.get('window').height / 15,
                marginRight: 10,
              }}
            />
          ) : (
            <Text
              style={{
                fontSize: Dimensions.get('window').height / 15,
                marginRight: 10,
              }}>
              {this.state.value}
            </Text>
          )}
          <Text
            style={{
              fontSize: Dimensions.get('window').height / 15,
              marginRight: 10,
            }}>
            {this.state.sonuc}
          </Text>
        </View>
        <View style={styles.asagisi}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.ekle('1')}>
                <Text style={styles.yazi}>1</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.ekle('2')}>
                <Text style={styles.yazi}>2</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.ekle('3')}>
                <Text style={styles.yazi}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    value: '0',
                    sonuc: '0',
                    goster: 0,
                    ara: '0',
                    gecmis: [],
                  })
                }>
                <Text style={styles.yazi}>C</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.ekle('4')}>
                <Text style={styles.yazi}>4</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.ekle('5')}>
                <Text style={styles.yazi}>5</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.ekle('6')}>
                <Text style={styles.yazi}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.isaret('+')}>
                <Text style={styles.yazi}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.ekle('7')}>
                <Text style={styles.yazi}>7</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.ekle('8')}>
                <Text style={styles.yazi}>8</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.ekle('9')}>
                <Text style={styles.yazi}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.isaret('-')}>
                <Text style={styles.yazi}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.ekle('0')}>
                <Text style={styles.yazi}>0</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.isaret('x')}>
                <Text style={styles.yazi}>x</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity onPress={() => this.isaret('÷')}>
                <Text style={styles.yazi}>÷</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kutu}>
              <TouchableOpacity
                onPress={() => {
                  let dizi = this.state.gecmis;
                  if (dizi.length > 0) {
                    if (
                      this.state.value.length > 2 &&
                      this.state.value[0] === '='
                    ) {
                      dizi.push(this.state.value.slice(2));
                    } else if (this.state.value.length > 2) {
                      dizi.push(this.state.value);
                    }
                    dizi.push(this.state.sonuc);
                    dizi.push('-----------------------------------');
                    this.setState({
                      gecmis: dizi,
                      goster: 0,
                      value: this.state.sonuc,
                    });
                  }
                }}>
                <Text style={styles.yazi}>=</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: Dimensions.get('window').height,
    justifyContent: 'center',
  },
  yukarisi: {
    flex: Dimensions.get('window').height / 2,

    backgroundColor: '#d5d5d5',
    alignItems: 'flex-end',
  },
  asagisi: {
    flex: Dimensions.get('window').height / 2,

    backgroundColor: 'white',

    flexDirection: 'column',
  },
  kutu: {
    width: Dimensions.get('window').width / 4,
    borderWidth: 1,
    borderColor: 'grey',
    height: Dimensions.get('window').height / 8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  yazi: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height / 20,
    fontWeight: '100',
    color: 'grey',
  },
});
