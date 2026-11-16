<?php

namespace App\Filament\Resources\Donations\Tables;

use App\Enums\DonationStatus;
use App\Models\Donation;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class DonationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('transaction_id')->label('রসিদ নং')->searchable()->copyable()->fontFamily('mono'),
                TextColumn::make('fund.label')->label('তহবিল')->badge()->color('gray'),
                TextColumn::make('donor_name')->label('দাতা')->searchable()
                    ->formatStateUsing(fn ($state, Donation $r) => $r->is_anonymous ? 'নাম প্রকাশে অনিচ্ছুক' : $state),
                TextColumn::make('amount')->label('পরিমাণ')->money('BDT')->sortable()->summarize(\Filament\Tables\Columns\Summarizers\Sum::make()->money('BDT')->label('মোট')),
                TextColumn::make('method')->label('মাধ্যম')->formatStateUsing(fn ($state) => Donation::METHODS[$state] ?? $state),
                TextColumn::make('status')->label('অবস্থা')->badge(),
                TextColumn::make('paid_at')->label('তারিখ')->dateTime('d M Y')->sortable(),
                TextColumn::make('recorder.name')->label('রেকর্ড করেছেন')->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')->label('অবস্থা')->options(DonationStatus::class),
                SelectFilter::make('donation_fund_id')->label('তহবিল')->relationship('fund', 'label'),
            ])
            ->headerActions([
                Action::make('exportCsv')->label('CSV ডাউনলোড')->icon('heroicon-o-arrow-down-tray')
                    ->visible(fn () => Auth::user()?->can('donations.export'))
                    ->action(function ($livewire) {
                        /** @var Builder $query */
                        $query = $livewire->getFilteredTableQuery()->with('fund', 'project');

                        return response()->streamDownload(function () use ($query) {
                            $out = fopen('php://output', 'w');
                            fwrite($out, "\xEF\xBB\xBF"); // UTF-8 BOM so Excel shows Bengali correctly
                            fputcsv($out, ['receipt', 'date', 'fund', 'project', 'donor', 'contact', 'amount', 'method', 'status', 'reference']);
                            $query->chunk(500, function ($rows) use ($out) {
                                foreach ($rows as $d) {
                                    fputcsv($out, [
                                        $d->transaction_id, $d->paid_at?->format('Y-m-d'), $d->fund?->label, $d->project?->title,
                                        $d->is_anonymous ? 'anonymous' : $d->donor_name, $d->contact, $d->amount, $d->method,
                                        $d->status->value, $d->gateway_reference,
                                    ]);
                                }
                            });
                            fclose($out);
                        }, 'donations-'.now()->format('Y-m-d').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
                    }),
            ])
            ->recordActions([EditAction::make()]);
    }
}
