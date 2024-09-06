import { subscribeToUpdates } from '@/lib/subscribeToUpdates'
import { Prose } from './prose'
import { SubscribeToUpdatesFormClient } from './subscribe-to-updates-form-client'

export function SubscribeToUpdatesForm() {
  return (
    <section className="mb-32">
      <Prose>
        <h3 id="mailing-list" className="text-2xl font-bold">
          Mailing List
        </h3>
        <p>
          If you want to receive updates on new posts or when I cook another batch of hot sauce,
          leave your email below.
        </p>
        <SubscribeToUpdatesFormClient subscribeToUpdates={subscribeToUpdates} />
      </Prose>
    </section>
  )
}

export function SubscribeToUpdatesFormWithoutText() {
  return <SubscribeToUpdatesFormClient subscribeToUpdates={subscribeToUpdates} />
}
