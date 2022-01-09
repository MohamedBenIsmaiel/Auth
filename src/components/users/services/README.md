# Service Director

Service is just a Util , use-cases use it as a helper, there is are 4 four files in service directory
* Filter is a class that contain static method `mailOrMobileFilter` that generate query to get user by mobile or email

```
filter.ts file

export default class Filter {
  static mailOrMobileFiler(
    email: string,
    mobileNumber: string
  ): FilterQuery<IUser> {
    return { $or: [{ email }, { mobileNumber }] };
  }
}

```

* token and password are classess contain static methods use-case use them as a helper