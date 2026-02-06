import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { Database } from '../database.types';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient<Database>;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // develop의 최신 키 명칭(SERVICE_ROLE_KEY)을 사용하되, 내 코드의 안전한 에러 처리를 유지합니다.
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL') ?? '';
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    if (!supabaseUrl || !supabaseKey) {
      throw new InternalServerErrorException('Supabase URL and Key must be provided in .env');
    }

    this.supabase = createClient<Database>(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient<Database> {
    return this.supabase;
  }
}
