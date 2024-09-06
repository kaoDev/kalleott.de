import { unsubscribeFromUpdates } from '@/lib/unsubscribeFromUpdates'
import { Prose } from './prose'
import { UnsubscribeFromUpdatesFormClient } from './unsubscribe-from-updates-form-client'

export function UnSubscribeFromUpdatesForm({ prefilledEmail }: { prefilledEmail?: string }) {
  return (
    <section className="mb-32">
      <Prose>
        <h3 id="mailing-list" className="text-2xl font-bold">
          Unsubscribe
        </h3>
        <p>If you want to stop receiving updates leave your email below.</p>
        <UnsubscribeFromUpdatesFormClient
          prefilledEmail={prefilledEmail}
          unsubscribeFromUpdates={unsubscribeFromUpdates}
        />
      </Prose>
    </section>
  )
}
