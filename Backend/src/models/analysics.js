import mongoose from "mongoose";
const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    inputData: {
      Gender: {
        type: String,
        required: true,
        enum: ["M", "F"],
      },
      Age: {
        type: Number,
        required: true,
        min: 40,
        max: 120,
      },
      EDUC: {
        type: Number,
        required: true,
        min: 0,
        max: 30,
      },
      MMSE: {
        type: Number,
        required: true,
        min: 0,
        max: 30,
      },
      CDR: {
        type: Number,
        required: true,
        min: 0,
        max: 3,
      },
      eTIV: {
        type: Number,
        required: true,
      },
      nWBV: {
        type: Number,
        required: true,
        min: 0,
        max: 1,
      },
      ASF: {
        type: Number,
        required: true,
      },
    },

    // Analysis Results
    results: {
      has_dementia: {
        type: Boolean,
        required: true,
      },
      diagnosis_reason: {
        type: String,
        required: true,
      },
      dementia_severity: {
        type: String,
        required: true,
      },
      prevention_or_treatment: {
        type: String,
        required: true,
      },
      markdown_input_table: String,
      markdown_score_table: String,
      short_summary: String,
      full_markdown_report: String,
    },

    // Metadata
    analyzedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);
analysisSchema.index({ userId: 1, createdAt: -1 });
export const Analysis = mongoose.model("Analysis", analysisSchema);
