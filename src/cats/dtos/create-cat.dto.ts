export class CreateCatDto {
  // take care of strictPropertyInitialization by using non-null assertion (!)
  // only happens when tsconfig's strict is set to true.
  name!: string;
  age!: number;
  breed!: string;
}
