import mongoose, { Document, Schema } from 'mongoose';

export interface IModule extends Document {
  title: string;
  course: mongoose.Schema.Types.ObjectId;
  content: mongoose.Schema.Types.ObjectId[];
}

const ModuleSchema: Schema = new Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }]
});

export default mongoose.models.Module || mongoose.model<IModule>('Module', ModuleSchema);