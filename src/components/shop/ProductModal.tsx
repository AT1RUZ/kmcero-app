import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MockProduct } from '../../data/mockProducts';
import { Button } from '../ui/Button';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

type Props = {
  product: MockProduct | null;
  visible: boolean;
  onClose: () => void;
  onAddToCart: (product: MockProduct, qty: number) => void;
  inCart?: boolean;
  onViewCart?: () => void;
};

export function ProductModal({
  product,
  visible,
  onClose,
  onAddToCart,
  inCart,
  onViewCart,
}: Props) {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Pressable style={styles.close} onPress={onClose}>
            <Ionicons name="close" size={22} color={colors.foreground} />
          </Pressable>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={require('../../../assets/brand/placeholder2.webp')}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.header}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.category}>{product.category}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={16} color={colors.star} />
                  <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
                  <Text style={styles.reviews}>({product.reviewCount} reviews)</Text>
                </View>
              </View>
              <View style={styles.priceCol}>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <Text style={styles.unit}>USD/{product.unitOfMeasure}</Text>
              </View>
            </View>

            <Text style={styles.desc}>{product.description}</Text>

            <View style={styles.qtyRow}>
              <Text style={styles.qtyLabel}>Cantidad</Text>
              <View style={styles.qtyControls}>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Ionicons name="remove" size={16} color={colors.foreground} />
                </Pressable>
                <Text style={styles.qtyValue}>{qty}</Text>
                <Pressable style={styles.qtyBtn} onPress={() => setQty((q) => q + 1)}>
                  <Ionicons name="add" size={16} color={colors.foreground} />
                </Pressable>
              </View>
            </View>

            {inCart ? (
              <Button variant="outline" onPress={onViewCart} style={{ marginTop: 12 }}>
                Ver en carrito
              </Button>
            ) : (
              <Button
                onPress={() => {
                  // TODO: ADD_TO_CART mutation + stock/daily limits
                  onAddToCart(product, qty);
                }}
                style={{ marginTop: 12 }}
                disabled={product.stockTier === 'OUT'}
              >
                {product.stockTier === 'OUT' ? 'Agotado' : 'Agregar al carrito'}
              </Button>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '88%',
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  close: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: spacing.md,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.foreground,
  },
  category: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  rating: { fontFamily: fonts.medium, fontSize: 13, color: colors.foreground },
  reviews: { fontFamily: fonts.regular, fontSize: 12, color: colors.mutedForeground },
  priceCol: { alignItems: 'flex-end' },
  price: { fontFamily: fonts.bold, fontSize: 26, color: colors.primary },
  unit: { fontFamily: fonts.regular, fontSize: 12, color: colors.mutedForeground },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
    lineHeight: 20,
  },
  qtyRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyLabel: { fontFamily: fonts.medium, fontSize: 14, color: colors.foreground },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: { fontFamily: fonts.semibold, fontSize: 16, minWidth: 24, textAlign: 'center' },
});
