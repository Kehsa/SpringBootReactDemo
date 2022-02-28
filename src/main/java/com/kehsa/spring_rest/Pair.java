package com.kehsa.spring_rest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class Pair<A, B> {
    private A left;
    private B right;
}
