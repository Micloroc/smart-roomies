import {Document} from 'mongoose';
import {Home} from "../../domain/model/home.entity";

export type HomeDocument = Home & Document;