import { supabase } from './lib/supabase'

async function test() {
  const { error } = await supabase
    .from('profiles')
    .select('id')
    .limit(1)

  if (error) {
    console.error('Supabase hatası:', error.message)
  } else {
    console.log('CraftLeague Supabase bağlantısı başarılı!')
  }
}

test()