import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Story extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column()
    validTime : number;

    @Column()
    author : string;

    @Column()
    image : string;

    @Column()
    hashtags : string[];
}
