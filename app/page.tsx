import ExampleTable from '@/components/ExampleTable'
import { Btn } from 'zvijude/btns'

export default function Home() {
  return (
    <div>
      Hello World
      <ExampleTable
        data={[
          {
            offrDt: '2025-01-01',
            clientData: 'John Doe',
          },
        ]}
      />
      <Btn lbl='Click me' icon='plus' />
    </div>
  )
}
