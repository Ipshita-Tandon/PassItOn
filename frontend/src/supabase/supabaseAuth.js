import supabase from './supabase';

// Wrapper for auth functions
const signUpWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
};

const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};


const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};

const getCurrentUser = () => supabase.auth.getUser();

export { signUpWithEmail, signInWithEmail, signOut, getCurrentUser };
