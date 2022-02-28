package com.kehsa.spring_rest.database.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "goods")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@EqualsAndHashCode
public class Good {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private boolean deleted;
    @ManyToOne
    private SubGroup subGroup;
}