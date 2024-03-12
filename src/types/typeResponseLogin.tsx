export type logInType = {
  message?: string;
  code?: number;
  data?: {
    data: {
      token: string;
      message: string;
      user: {
        birth_date: string;
        blood_group: string;
        email: string;
        first_name: string;
        gender: string;
        id: number;
        last_name: string;
        middle_name: string;
        phone_number: string;
      };
    };
  };
};
