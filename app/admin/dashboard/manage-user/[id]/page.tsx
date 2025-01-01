import { FC } from "react";
import { USERS } from "../../data/users";
import { notFound } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '../components/userColumns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getBadgeColor } from '../lib/utils';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

