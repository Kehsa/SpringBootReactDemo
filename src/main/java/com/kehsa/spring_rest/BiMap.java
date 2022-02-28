package com.kehsa.spring_rest;

import java.util.HashMap;

public class BiMap<K, V> {
    private final HashMap<K, V> map1 = new HashMap<>();
    private final HashMap<V, K> map2 = new HashMap<>();

    public BiMap(Iterable<Pair<K, V>> ls) {
        for (var p : ls) {
            put(p.getLeft(), p.getRight());
        }
    }

    public void put(K key, V val) {
        map1.put(key, val);
        map2.put(val, key);
    }

    public V get(K key) {
        return map1.get(key);
    }

    public K getInverted(V val) {
        return map2.get(val);
    }

    public void clear() {
        map1.clear();
        map2.clear();
    }
}
