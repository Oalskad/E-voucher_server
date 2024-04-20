import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { VoucherSell, VoucherSellDocument } from './schema/voucher-sell.schema';
import { VoucherService } from 'src/voucher/voucher.service';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Voucher, VoucherDocument } from 'src/voucher/schema/voucher.schema';

@Injectable()
export class voucherSellService {
  constructor(
    // private readonly voucherService: VoucherService,
    @InjectModel(VoucherSell.name)
    private voucherSellModel: Model<VoucherSellDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Voucher.name) private voucherModel: Model<VoucherDocument>,
  ) {}

  async findAll(): Promise<VoucherSell[]> {
    return await this.voucherSellModel
      .find()
      .populate('userId')
      .populate('voucherId')
      .exec();
  }

  async create(voucherSell: VoucherSell): Promise<VoucherSell> {
    const newVoucherSell = new this.voucherSellModel(voucherSell);
    return await newVoucherSell.save();
  }

  async findOne(id: string): Promise<VoucherSell> {
    return await this.voucherSellModel
      .findById(id)
      .populate('userId')
      .populate('voucherId');
  }

  async findByUserId(userId: string): Promise<VoucherSell[]> {
    return await this.voucherSellModel
      .find({ userId })
      .populate('userId')
      .populate('voucherId');
  }
  async findByVoucherId(voucherId: string): Promise<VoucherSell[]> {
    return await this.voucherSellModel
      .find({ voucherId })
      .populate('userId')
      .populate('voucherId');
  }
  async findByUserIdAndVoucherId(
    userId: string,
    voucherId: string,
  ): Promise<VoucherSell[]> {
    if (userId && !voucherId) return this.findByUserId(userId);
    else if (!userId && voucherId) return this.findByVoucherId(voucherId);
    else
      return this.voucherSellModel
        .find({ userId, voucherId })
        .populate('userId')
        .populate('voucherId');
  }

  async update(id: string, voucherSell: VoucherSell): Promise<VoucherSell> {
    return await this.voucherSellModel.findByIdAndUpdate(id, voucherSell, {
      new: true,
    });
  }

  async delete(id: string): Promise<VoucherSell> {
    return await this.voucherSellModel.findByIdAndDelete(id);
  }
}
