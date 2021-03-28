import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SummaryDocument } from './dto/summary.dto';

const sum = {
  total: 232323,
};

@Injectable()
export class SummaryService {
  constructor(
    @InjectModel('Summary')
    private readonly summaryModel: Model<SummaryDocument>,
  ) {}

  async foo() {
    const abc = new this.summaryModel(sum);
    const def = await abc.save();
    console.log('MODEL: ', def);
  }
}
