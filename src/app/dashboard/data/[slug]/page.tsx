import PageSlugComponent from "./PageSlugComponent"

export function generateStaticParams() {
  return [{ slug: 'debts' }, { slug: 'income' }, { slug: 'balance' }, { slug: 'saving' }, { slug: 'expenses'}]
}

export default function NoticeTestPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  return <PageSlugComponent params={{ slug: slug }} />
}