import mongoose from 'mongoose';

const shoutoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  requiredSkills: [{
    type: String,
    required: [true, 'At least one skill is required'],
    trim: true
  }],
  projectType: {
    type: String,
    required: [true, 'Project type is required'],
    enum: ['academic', 'personal', 'startup', 'other']
  },
  urgency: {
    type: String,
    required: [true, 'Urgency level is required'],
    enum: ['low', 'medium', 'high', 'urgent']
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required']
  },
  contactPreference: {
    type: String,
    required: [true, 'Contact preference is required'],
    enum: ['email', 'message', 'both']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true
});

const Shoutout = mongoose.models.Shoutout || mongoose.model('Shoutout', shoutoutSchema);

export default Shoutout; 