import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 140, height = 32 }) => {
  const iconSize = height;

  return (
    <View style={[styles.container, { height }]}>
      {/* M Icon */}
      <View style={[styles.iconContainer, { width: iconSize, height: iconSize }]}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 50 50">
          {/* Simplified M shape with rounded paths */}
          <Path
            d="M 10 38 L 10 18 C 10 13 12 10 16 10 C 19 10 20 12 20 15 L 20 24 C 20 27 22 28 25 28 C 28 28 30 27 30 24 L 30 15 C 30 12 31 10 34 10 C 38 10 40 13 40 18 L 40 38"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <Text style={styles.smallText}>MOYOCLUB.COM</Text>
      </View>

      {/* MoyoClub Text */}
      <Text style={[styles.logoText, { fontSize: height * 0.75 }]}>MoyoClub</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  smallText: {
    position: 'absolute',
    bottom: 0,
    fontSize: 5,
    color: '#FF6B35',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  logoText: {
    fontWeight: '700',
    color: '#8B6F47',
  },
});

export default Logo;
