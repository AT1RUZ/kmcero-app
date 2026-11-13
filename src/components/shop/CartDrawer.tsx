import React from 'react';
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

export type CartLine = {
  id: string;
  product: MockProduct;
  quantity: number;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  items: CartLine[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
};

export function CartDrawer({ visible, onClose, items, onUpdateQty, onRemove }: Props) {
  const total = items.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={styles.dim} onPress={onClose} />
        <View style={styles.panel}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons name="cart-outline" size={20} color={colors.foreground} />
              <Text style={styles.title}>Carrito</Text>
            </View>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={22} color={colors.foreground} />
            </Pressable>
          </View>

          <View style={styles.timer}>
            <Ionicons name="time-outline" size={16} color="#92400E" />
            <Text style={styles.timerText}>Su carrito expira en: 14:59</Text>
          </View>

          <ScrollView style={styles.list} contentContainerStyle={{ padding: spacing.md, gap: 12 }}>
            {items.length === 0 ? (
              <Text style={styles.empty}>Tu carrito está vacío</Text>
            ) : (
              items.map((line) => (
                <View key={line.id} style={styles.item}>
                  <Image
                    source={require('../../../assets/brand/placeholder2.webp')}
                    style={styles.thumb}
                  />
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.itemName} numberOfLines={2}>
                      {line.product.name}
                    </Text>
                    <Text style={styles.itemPrice}>
                      ${line.product.price.toFixed(2)}
                    </Text>
                    <View style={styles.qtyRow}>
                      <Pressable
                        style={styles.qtyBtn}
                        onPress={() =>
                          onUpdateQty(line.id, Math.max(1, line.quantity - 1))
                        }
                      >
                        <Ionicons name="remove" size={14} color={colors.foreground} />
                      </Pressable>
                      <Text style={styles.qty}>{line.quantity}</Text>
                      <Pressable
                        style={styles.qtyBtn}
                        onPress={() => onUpdateQty(line.id, line.quantity + 1)}
                      >
                        <Ionicons name="add" size={14} color={colors.foreground} />
                      </Pressable>
                      <Pressable onPress={() => onRemove(line.id)} style={{ marginLeft: 'auto' }}>
                        <Ionicons name="trash-outline" size={18} color={colors.destructive} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)} USD</Text>
            </View>
            <Button
              disabled={items.length === 0}
              onPress={() => {
                // TODO: checkout / crear pedido
              }}
            >
              Continuar compra
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
  dim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  panel: {
    width: '88%',
    maxWidth: 400,
    backgroundColor: colors.card,
    height: '100%',
  },
  header: {
    height: 56,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontFamily: fonts.bold, fontSize: 16, color: colors.foreground },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: '#FEF3C7',
  },
  timerText: { fontFamily: fonts.medium, fontSize: 13, color: '#92400E' },
  list: { flex: 1 },
  empty: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginTop: 40,
  },
  item: {
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  thumb: { width: 64, height: 64, borderRadius: radius.md },
  itemName: { fontFamily: fonts.medium, fontSize: 13, color: colors.foreground },
  itemPrice: { fontFamily: fonts.bold, fontSize: 13, color: colors.primary },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { fontFamily: fonts.semibold, fontSize: 14, minWidth: 18, textAlign: 'center' },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    gap: 12,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontFamily: fonts.medium, fontSize: 14, color: colors.mutedForeground },
  totalValue: { fontFamily: fonts.bold, fontSize: 18, color: colors.foreground },
});
