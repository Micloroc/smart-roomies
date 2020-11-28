import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {Injectable} from "@nestjs/common";
import {UserRepository} from "../../../../user/domain/repositories/user.repository";
import {HomeRepository} from "../../../../home/domain/repositories/home.repository";
import {CreateMeal} from "../../../domain/commands/create-meal.command";
import {MealRepository} from "../../../domain/repositories/meal.repository";
import {HomeNotFound} from "../../../../home/domain/exceptions/home-not-found.exception";
import {MealAlreadyExistsException} from "../../../domain/exceptions/meal-already-exists.exception";
import {Meal} from "../../../domain/models/meal.entity";

@Injectable()
@CommandHandler(CreateMeal)
export class CreateMealHandler implements ICommandHandler<CreateMeal> {

    constructor(private mealRepository: MealRepository,
                private userRepository: UserRepository,
                private publisher: EventPublisher,
                private homeRepository: HomeRepository) {
    }

    async execute(command: CreateMeal) {
        let meal = await this.mealRepository.findById(command.id);
        if (meal) throw new MealAlreadyExistsException();

        const home = await this.homeRepository.findById(command.homeId);
        if (!home) throw new HomeNotFound();

        // meal = new Meal(command);
        console.log(meal);
        await this.mealRepository.save(meal);

        meal = this.publisher.mergeObjectContext(meal);
        meal.commit();
    }
}