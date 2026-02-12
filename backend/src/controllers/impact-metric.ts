import { validationResult } from "express-validator";

import ImpactMetric from "../models/impact-metric";
import validationErrorParser from "../utils/validationErrorParser";

import type { MetricItem } from "../models/impact-metric";
import type { RequestHandler } from "express";

export const getImpactMetric: RequestHandler = async (req, res, next) => {
  try {
    const impactMetric = await ImpactMetric.findOne();
    res.status(200).json(impactMetric || { metrics: [] });
  } catch (error) {
    next(error);
  }
};

type UpdateRequest = {
  metrics: Partial<MetricItem>[];
};

export const updateImpactMetric: RequestHandler<
  Record<string, any>,
  unknown,
  UpdateRequest
> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { metrics: updates } = req.body;

    const doc = (await ImpactMetric.findOne()) || new ImpactMetric({ metrics: [] });

    updates.forEach((update) => {
      const { order, statistic, subtitle, description } = update;

      if (order === undefined) return;

      const index = doc.metrics.findIndex((m) => m.order === order);

      if (index !== -1) {
        const metric = doc.metrics[index]!;

        if (statistic !== undefined) metric.statistic = statistic;
        if (subtitle !== undefined) metric.subtitle = subtitle;
        if (description !== undefined) metric.description = description;
      } else {
        doc.metrics.push({
          order,
          statistic: statistic || "",
          subtitle: subtitle || "",
          description: description || "",
        });
      }
    });

    await doc.save();
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
