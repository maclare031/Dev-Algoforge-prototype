import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  title: string;
  description: string;
  type: 'VIDEO' | 'PPT' | 'NOTES';
  fileUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  module: mongoose.Schema.Types.ObjectId;
}

const ContentSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['VIDEO', 'PPT', 'NOTES'], required: true },
  fileUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  tags: [{ type: String }],
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true }
});

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);