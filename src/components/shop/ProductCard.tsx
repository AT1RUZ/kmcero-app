import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MockProduct } from '../../data/mockProducts';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';

type Props = {
  product: MockProduct;
  inCart?: boolean;
  onPress: () => void;
};

function stockLabel(tier: MockProduct['stockTier']) {
  if (tier === 'OUT') return { text: 'Agotado', color: '#DC2626' };
  if (tier === 'LOW') return { text: 'Pocas unidades', color: '#D97706' };
  return { text: 'Disponible', color: '#16A34A' };
}

export function ProductCard({ product, inCart, onPress }: Props) {
  const stock = stockLabel(product.stockTier);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageWrap}>
        <Image
          source={require('../../../assets/brand/placeholder2.webp')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.meta}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.category}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>
          ${product.price.toFixed(2)}
          <Text style={styles.usd}> USD</Text>
        </Text>
        <Text style={styles.unit}>por {product.unitOfMeasure}</Text>
        <Text style={[styles.stock, { color: stock.color }]}>
          {inCart ? 'En el carrito' : stock.text}
        </Text>
        <View style={styles.ratingRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < Math.round(product.rating) ? 'star' : 'star-outline'}
              size={14}
              color={i < Math.round(product.rating) ? colors.star : colors.starEmpty}
            />
          ))}
          <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.reviews}>({product.reviewCount} reseñas)</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1 },
  imageWrap: {
    aspectRatio: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  image: { width: '100%', height: '100%' },
  meta: { marginTop: 6, alignItems: 'center', gap: 2 },
  badge: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 4,
  },
  badgeText: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.foreground,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.foreground,
    textAlign: 'center',
  },
  price: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.primary,
  },
  usd: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.mutedForeground,
  },
  unit: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.mutedForeground,
  },
  stock: {
    fontFamily: fonts.medium,
    fontSize: 11,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  ratingText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.foreground,
    marginLeft: 4,
  },
  reviews: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.mutedForeground,
  },
});
