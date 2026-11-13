import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ShopHeader } from '../components/shop/ShopHeader';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductModal } from '../components/shop/ProductModal';
import { CartDrawer, CartLine } from '../components/shop/CartDrawer';
import {
  MOCK_CATEGORIES,
  MOCK_PRODUCTS,
  MockProduct,
} from '../data/mockProducts';
import { NavigateFn } from '../navigation/types';
import { colors, radius } from '../theme/colors';
import { fonts } from '../theme/typography';
import { spacing } from '../theme/spacing';

type Props = { onNavigate: NavigateFn };

export function ShopScreen({ onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  const featured = MOCK_PRODUCTS.filter((p) => p.featured);

  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q),
      );
    }
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
    return list;
  }, [query, selectedCategory, sortBy]);

  const cartByProduct = useMemo(() => {
    const map = new Map<string, CartLine>();
    for (const line of cart) map.set(line.product.id, line);
    return map;
  }, [cart]);

  const addToCart = (product: MockProduct, quantity: number) => {
    // TODO: mutación GraphQL ADD_TO_CART + cola de reserva
    setCart((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id
            ? { ...l, quantity: l.quantity + quantity }
            : l,
        );
      }
      return [...prev, { id: `line-${product.id}`, product, quantity }];
    });
    setSelectedProduct(null);
    setCartOpen(true);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ShopHeader
        onNavigate={onNavigate}
        cartCount={cart.reduce((n, l) => n + l.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
      />

      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={colors.mutedForeground} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos…"
          placeholderTextColor={colors.mutedForeground}
          value={query}
          onChangeText={setQuery}
          // TODO: sync search params / GraphQL shop query
        />
        {query ? (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={colors.mutedForeground} />
          </Pressable>
        ) : null}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            {/* Carrusel destacados */}
            <View style={styles.featuredBox}>
              <Text style={styles.featuredTitle}>Productos Destacados</Text>
              <Text style={styles.featuredSub}>
                Los más vendidos y mejor valorados por nuestros clientes
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingVertical: 8 }}
              >
                {featured.map((p) => (
                  <Pressable
                    key={p.id}
                    style={styles.offerCard}
                    onPress={() => setSelectedProduct(p)}
                  >
                    <View style={styles.offerTag}>
                      <Text style={styles.offerTagText}>{p.category}</Text>
                    </View>
                    <Text style={styles.offerTitle} numberOfLines={2}>
                      {p.name}
                    </Text>
                    <Text style={styles.offerPrice}>${p.price.toFixed(2)}</Text>
                    <Text style={styles.offerMeta}>
                      {p.reviewCount} opiniones • {p.rating.toFixed(1)} ⭐
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Filtros categorías */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersRow}
            >
              <Pressable
                style={[styles.chip, !selectedCategory && styles.chipActive]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text
                  style={[
                    styles.chipText,
                    !selectedCategory && styles.chipTextActive,
                  ]}
                >
                  Todos
                </Text>
              </Pressable>
              {MOCK_CATEGORIES.map((c) => (
                <Pressable
                  key={c.slug}
                  style={[
                    styles.chip,
                    selectedCategory === c.name && styles.chipActive,
                  ]}
                  onPress={() =>
                    setSelectedCategory((prev) => (prev === c.name ? null : c.name))
                  }
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedCategory === c.name && styles.chipTextActive,
                    ]}
                  >
                    {c.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.toolbar}>
              <Text style={styles.count}>
                1-{filtered.length}/{filtered.length} productos
              </Text>
              <Pressable
                style={styles.sortBtn}
                onPress={() =>
                  setSortBy((s) =>
                    s === 'featured'
                      ? 'price-low'
                      : s === 'price-low'
                        ? 'price-high'
                        : 'featured',
                  )
                }
              >
                <Text style={styles.sortText}>
                  {sortBy === 'featured'
                    ? 'Relevancia'
                    : sortBy === 'price-low'
                      ? 'Precio: menor a mayor'
                      : 'Precio: mayor a menor'}
                </Text>
                <Ionicons name="chevron-down" size={14} color={colors.foreground} />
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No se encontraron productos</Text>
            <Text style={styles.emptyDesc}>
              Intenta ajustar tus filtros para encontrar lo que buscas.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrap}>
            <ProductCard
              product={item}
              inCart={cartByProduct.has(item.id)}
              onPress={() => setSelectedProduct(item)}
            />
          </View>
        )}
      />

      <ProductModal
        product={selectedProduct}
        visible={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        inCart={selectedProduct ? cartByProduct.has(selectedProduct.id) : false}
        onViewCart={() => {
          setSelectedProduct(null);
          setCartOpen(true);
        }}
      />

      <CartDrawer
        visible={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={(id, qty) => {
          // TODO: UPDATE_CART_ITEM mutation
          setCart((prev) => prev.map((l) => (l.id === id ? { ...l, quantity: qty } : l)));
        }}
        onRemove={(id) => {
          // TODO: REMOVE_FROM_CART mutation
          setCart((prev) => prev.filter((l) => l.id !== id));
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  searchBar: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: 'rgba(26,27,46,0.12)',
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.foreground,
  },
  listContent: { paddingBottom: 40, paddingHorizontal: spacing.sm },
  row: { gap: 12 },
  cardWrap: { flex: 1, marginBottom: 16 },
  featuredBox: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  featuredTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primaryForeground,
  },
  featuredSub: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
    marginBottom: 4,
  },
  offerCard: {
    width: 160,
    height: 180,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(254,110,0,0.35)',
    padding: 12,
    justifyContent: 'flex-end',
  },
  offerTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.accent,
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  offerTagText: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    color: colors.white,
  },
  offerTitle: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.white,
  },
  offerPrice: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.accent,
    marginTop: 4,
  },
  offerMeta: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  filtersRow: {
    gap: 8,
    paddingVertical: spacing.sm,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.foreground,
  },
  chipTextActive: { color: colors.primaryForeground },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingHorizontal: 4,
  },
  count: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.mutedForeground,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(26,27,46,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(26,27,46,0.15)',
    borderRadius: radius.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sortText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.foreground,
  },
  empty: { alignItems: 'center', paddingVertical: 48, gap: 8 },
  emptyTitle: { fontFamily: fonts.medium, fontSize: 16, color: colors.foreground },
  emptyDesc: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
});
