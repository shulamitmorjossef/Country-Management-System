// models/User.ts
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  password: string;
  isAdmin: boolean;
  permissions: {
    canAdd?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    [key: string]: boolean | undefined;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    profilePicture: { type: String },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    permissions: {
      type: Object,
      default: {
        canAdd: false,
        canEdit: false,
        canDelete: false,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash סיסמה לפני שמירה
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// פונקציה לבדיקה של סיסמה
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
