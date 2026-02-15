import { validationResult } from "express-validator";

import ImpactMetric from "../models/impact-metric";
import validationErrorParser from "../utils/validationErrorParser";

import type { MetricItem } from "../models/impact-metric";
import type { RequestHandler } from "express";
import type { Types } from "mongoose";

export const getImpactMetric: RequestHandler = async (req, res, next) => {
  try {
    const impactMetric = await ImpactMetric.findOne();
    res.status(200).json(impactMetric || { metrics: [] });
  } catch (error) {
    next(error);
  }
};

type MetricItemWithId = MetricItem & { _id: Types.ObjectId };

type UpdateRequest = {
  metrics: (Partial<MetricItem> & { _id?: string })[];
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
    const dbMetrics = doc.metrics as MetricItemWithId[];

    const updateIds = new Set(updates.filter((u) => u._id).map((u) => u._id));

    const keptMetrics = dbMetrics.filter((m) => updateIds.has(m._id.toString()));

    const newMetricsList: MetricItemWithId[] = [];
    const keptMetricsMap = new Map(keptMetrics.map((m) => [m._id.toString(), m]));

    for (const update of updates) {
      const { _id, order, statistic, subtitle, description } = update;

      if (order === undefined) continue;

      if (_id && keptMetricsMap.has(_id)) {
        const metricToUpdate = keptMetricsMap.get(_id)!;

        if (statistic !== undefined) metricToUpdate.statistic = statistic;
        if (subtitle !== undefined) metricToUpdate.subtitle = subtitle;
        if (description !== undefined) metricToUpdate.description = description;

        metricToUpdate.order = order;
        newMetricsList.push(metricToUpdate);
      } else {
        const newMetric = {
          order,
          statistic,
          subtitle,
          description,
        } as MetricItemWithId;

        newMetricsList.push(newMetric);
      }
    }

    doc.metrics = newMetricsList;

    await doc.save();
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
